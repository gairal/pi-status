const PORTS = {
	Cobra: 3011,
	Falcon: 3010,
	Hippo: 3007,
	Lioness: 3005,
	Mongo: 27017,
	Redis: 6379,
	Scorpion: 3008,
	Smartcow: 3004,
	VendorSim: 3002,
};

const MONGO_URL = `mongodb://127.0.0.1:${PORTS.Mongo}/autofi`;
const REDIS_URL = `redis://127.0.0.1:${PORTS.Redis}`;
const JWT_SECRET = 'secret';
const API_GATEWAY = `http://localhost:${PORTS.Falcon}`;
const COBRA_URL = `http://localhost:${PORTS.Cobra}`;
const LIONESS_URL = `http://localhost:${PORTS.Lioness}`;
const VEHICLE_SERVICE_URL = `http://hippo.pi.local`;
const SCORPION_URL = `http://localhost:${PORTS.Scorpion}`;
const SMARTCOW_ENDPOINT = `http://localhost:${PORTS.Smartcow}`;
const VENDOR_SIM_URL = `http://localhost:${PORTS.VendorSim}`;

const ENV_COMMON = {
	NODE_ENV: 'development',
};

const WORKSPACE = '/home/ubuntu/workspace'

const status = {
	name: 'status',
	script: `${WORKSPACE}/pi-status/dist/index.js`,
};

const hippo = {
	name: 'hippo',
	script: `${WORKSPACE}/autofi/hippo/dist/server/index.js`,
	env: {
		...ENV_COMMON,
		PORT: PORTS.Hippo,
		API_GATEWAY,
		DECISIONING_URL: SMARTCOW_ENDPOINT,
		DISABLE_LUMPED_PRICING: 0,
		ENABLE_OPENAPI_JSON: true,
		ENABLE_SWAGGER_UI: true,
		ENCRYPTIONKEY: '0123456789',
		FTP_API_BASE_URL: 'https://autofi2.brickftp.com/api/rest/v1',
		FTP_API_KEY: '62a1498eff2dce830b3f3242572a264dd01edea8b108d20e39ca9b9e5ace30a8',
		FTP_INVENTORY_ENV_PATH: 'dealer-inventory-staging',
		JWT_SECRET,
		LOANAPP_MONGO_URL: MONGO_URL,
		USE_REBATES_ENDPOINT: false,
	},
};

const lioness = {
	name: 'lioness',
	script: `${WORKSPACE}/autofi/lioness/server/index.js`,
	env: {
		...ENV_COMMON,
		API_GATEWAY,
		BASE_URL: LIONESS_URL,
		CLIENT_PORT: PORTS.Lioness,
		COBRA_URL,
		ENABLE_ALERTS: false,
		INTEGRATION_TEST_NAME: 'Narwal Test',
		HIPPO_URL: `${API_GATEWAY}/v1/vehicle-service/inventory/import`,
		JWT_SECRET,
		LOANAPP_MONGO_URL: MONGO_URL,
		NODE_PATH: `${WORKSPACE}/autofi/lioness/server`,
		PANDA_API_SECRET: 'secret',
		SCORPION_URL,
		SMARTCOW_ENDPOINT,
		REDIS_URL,
		S3_MODE: 'local',
		VEHICLE_SERVICE_PROXY_URL: `${VEHICLE_SERVICE_URL}/api/v1/inventory/import`,
		VENDOR_SIM_URL,
	},
};

const vendorSim = {
	name: 'vendor-sim',
	script: `${WORKSPACE}/autofi/vendor-simulator/vendorsim.js`,
	env: {
		...ENV_COMMON,
		PORT: PORTS.VendorSim,
	},
};

module.exports = { apps: [hippo, lioness, status, vendorSim] };
