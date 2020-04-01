const nextEnv = require("next-env")
const dotEnvLoad = require("dotenv-load")

dotEnvLoad()

const withNextEnv = nextEnv()

module.exports = withNextEnv({
  env: {
    "MONGODB_URL": process.env.MONGODB_URL,
    "URL_ROOT": process.env.URL_ROOT,
    "API_KEY": process.env.API_KEY,
    "PORT": process.env.PORT
  }
})