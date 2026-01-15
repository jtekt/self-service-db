import {
  RDSClient,
  ModifyDBProxyCommand,
  DescribeDBProxiesCommand,
} from "@aws-sdk/client-rds";
import {
  SecretsManagerClient,
  CreateSecretCommand,
} from "@aws-sdk/client-secrets-manager";
import {
  AWS_ACCESS_KEY,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  RDS_PROXY_AUTH_SECRET_PREFIX,
  RDS_PROXY_NAME,
} from "@/config";

// TODO: check env is set correctly before initializing clients

// let sm: SecretsManagerClient;
// let rds: RDSClient;

export let registerUserInRdsProxy = async (
  username: string,
  password: string
) => {};

if (RDS_PROXY_NAME) {
  console.log("RDS_PROXY_NAME is defined");
  const sm = new SecretsManagerClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  const rds = new RDSClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  async function createUserSecret(username: string, password: string) {
    const secretName = `${RDS_PROXY_AUTH_SECRET_PREFIX}/${username}`;

    const create = await sm.send(
      new CreateSecretCommand({
        Name: secretName,
        SecretString: JSON.stringify({
          username,
          password,
        }),
      })
    );
    return create.ARN!;
  }

  async function getCurrentAuth() {
    const command = new DescribeDBProxiesCommand();

    const { DBProxies } = await rds.send(command);
    if (!DBProxies) throw new Error("No DBPRoxies");
    const DBProxy = DBProxies.find((dbp) => dbp.DBProxyName === RDS_PROXY_NAME);
    if (!DBProxy) throw new Error(`No DBPRroxy ${RDS_PROXY_NAME} not found`);
    const { Auth } = DBProxy;
    if (!Auth) throw new Error(`No Auth in ${RDS_PROXY_NAME} `);
    return Auth;
  }

  async function addSecretToRDSProxy(SecretArn: string) {
    const currentAuth = await getCurrentAuth();

    const command = new ModifyDBProxyCommand({
      DBProxyName: RDS_PROXY_NAME,
      Auth: [...currentAuth, { SecretArn }],
    });

    await rds.send(command);
  }

  registerUserInRdsProxy = async (username: string, password: string) => {
    const arn = await createUserSecret(username, password);
    await addSecretToRDSProxy(arn);
  };
}
