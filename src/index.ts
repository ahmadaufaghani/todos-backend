import "source-map-support";
import "dotenv/config";
import app from "./server"
import config from "./config";

const PORT = parseInt(config.port);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})