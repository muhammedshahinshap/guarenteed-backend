import { Subjects } from "@mspguarenteed/common";
import { natsWrapper } from "../config/natsWrapper";
import { jobPosterPublisher } from "../events/publisher/job-poster-publisher";
import { findByid, noOfapplication } from "../repositories/jobs";
import { Message } from "node-nats-streaming";
import nodemailer from "nodemailer";

export default async ({ body, user }: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhammedshahinshap07@gmail.com",
        pass: "ayujkizpxqdyqpok",
      },
    });
    let validator = true;
    const { id, fullname, email, address, city, zip, contact } = body;

    if (!user.premium) {
      const noOfapplications: any = await noOfapplication(user._id);
      const { total } = noOfapplications?.[0] ?? [];
      validator = total >= 5 ? false : true;
    }

    if (validator) {
      const data = await findByid(id);
      await new jobPosterPublisher(natsWrapper.client).publish({ data });
      const subscribe = natsWrapper.client.subscribe(
        Subjects.jobPosterDataReply,
        natsWrapper.client
          .subscriptionOptions()
          .setManualAckMode(true)
          .setDeliverAllAvailable()
          .setDurableName("job-poster-data-reply")
      );
      await subscribe.on("message", async (msg: Message) => {
        let datas: any = msg.getData();
        datas = JSON.parse(datas);

        const html = `
            <div class='container'>
            <div class='row >
            <div class='col-sm-12'>
            <h3>
            Hello sir i am
            ${fullname}
            </h3>
            </div>
            </div>
            <div class='row >
            <div class='col-sm-12'>
            <h4>
            I am interested in working with your company.
            </h4>
            </div>
            </div>
            <div class='row >
            <div class='col-sm-12'>
            <h4>
            Currently i am living in this address <br>
            ${address}
            <br>
            ${city}
            <br>
            ${zip}
            </h4>
            </div>
            </div>
            <div class='row >
            <div class='col-sm-12'>
            <h4>
            Please contact me if you are interested in my CV which i have attached :
           <span style='color:blue' ><b>${contact}</b></span>
            </h4>
            </div>
            </div>
            </div>`;

        const info = await transporter.sendMail({
          from: `${email}`,
          to: `${datas?.data?.[0]?.username}`,
          subject: `MR/MRS ${user.u_profile.name} (${user.username}) Has Responded To Your Post in Guarenteed`,
          text: `MR/MRS ${user.u_profile.name} (${user.username}) Has Responded To Your Post in Guarenteed`,
          html: html,
          // attachments: [
          //   {
          //     filename: `${req.fileOrginalname}`,
          //     path: `${path.join(__dirname, "../public/hirecv")}/${
          //       req.filename
          //     }`,
          //   },
          // ],
        });
        if (info.messageId) {
         
          msg.ack();
          return true
        } else throw new Error("Try again");
      });
    } else {
      throw new Error("Upgrade to premium for unlimited applications");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
