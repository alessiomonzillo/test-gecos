const argEnvIndex = process.argv.indexOf("--env");
let argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || "";

const RUN_ENV_MAP = {
    local: {
        instances: 2,
        max_memory_restart: "250M",
        port: "9999",
        backendPort: "9998",
    },
    dev: {
        instances: 2,
        max_memory_restart: "250M",
        port: "9999",
        backendPort: "9998",
    },
    prod: {
        instances: 4,
        max_memory_restart: "1000M",
        port: "9999",
        backendPort: "9998",
    },
};

if (!(argEnv in RUN_ENV_MAP)) {
    argEnv = "prod";
}

const env = RUN_ENV_MAP[argEnv];

module.exports = {
    apps: [
        {
            name: "gecos-backend",
            cwd: "./backend",
            script: "server.js",
            env_local: {
                NODE_ENV: "development",
                BACKEND_PORT: RUN_ENV_MAP.local.backendPort,
                APP_ENV: "local",
            },
            env_dev: {
                NODE_ENV: "production",
                BACKEND_PORT: RUN_ENV_MAP.dev.backendPort,
                APP_ENV: "dev",
            },
            env_prod: {
                NODE_ENV: "production",
                BACKEND_PORT: RUN_ENV_MAP.prod.backendPort,
                APP_ENV: "prod",
            },
        },
        {
            name: "9999.gecos",
            exec_mode: "cluster",
            instances: env.instances,
            max_memory_restart: env.max_memory_restart,
            script: "node_modules/next/dist/bin/next",
            args: "start",
            port: env.port,
            env_local: {
                NODE_PORT: "9999",
                PORT: "9999",
                APP_ENV: "local",
                CONTENT_API_URL: `http://localhost:${env.backendPort}`,
            },
            env_dev: {
                NODE_PORT: "9999",
                PORT: "9999",
                APP_ENV: "dev",
                CONTENT_API_URL: `http://localhost:${env.backendPort}`,
            },
            env_prod: {
                NODE_PORT: "9999",
                PORT: "9999",
                APP_ENV: "prod",
                CONTENT_API_URL: `http://localhost:${env.backendPort}`,
            },
        },
    ],
};
