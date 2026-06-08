"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support");
require("dotenv/config");
const server_1 = __importDefault(require("./server"));
const config_1 = __importDefault(require("./config"));
const PORT = parseInt(config_1.default.port);
server_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map