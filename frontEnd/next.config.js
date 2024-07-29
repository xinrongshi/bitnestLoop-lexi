
module.exports = {
  env: {
    NEXT_PUBLIC_USDT_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
    NEXT_PUBLIC_SAVING_PLATFORM_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_SAVING_PLATFORM_CONTRACT_ADDRESS,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
};
