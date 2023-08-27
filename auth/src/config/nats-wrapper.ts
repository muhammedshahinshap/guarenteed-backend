import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  protected _client?: Stan;
  get client() {
    if (!this._client) throw new Error("Cannot access before Nats connected");
    return this._client;
  }
  connect(clusterId: string, clientid: string, url: string) {
    this._client = nats.connect(clusterId, clientid, { url });
    this._client.on("close", () => {
      console.log("Nats connection closed");
      process.exit();
    });
    process.on("SIGINT", () => {
      this.client.close();
    });
    process.on("SIGTERM", () => {
      this.client.close();
    });
    return new Promise<void>((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("nats connected successfully");

        resolve();
      });
      this._client!.on("error", (err: Error) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
