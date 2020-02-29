"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
const valid_url_1 = require("valid-url");
(() => __awaiter(this, void 0, void 0, function* () {
    // Init the Express application
    const app = express_1.default();
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    /**
       * Implement a GET Request for /filteredImage that requires image url query to be passed.
       * Validate the protocol and the format of the file
       * Send a resized, gray scalled and compressed filtered image back
    **/
    app.get("/filteredImage", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { image_url } = req.query;
        if (!image_url) {
            return res.status(400).send("image url query is required");
        }
        if (!valid_url_1.isWebUri(image_url)) {
            return res.status(422).send("privided image url is not in the supported format");
        }
        try {
            const localFile = yield util_1.filterImageFromURL(image_url);
            res.sendFile(localFile, err => {
                if (err) {
                    console.error('ERROR for sending the file:', { localFile });
                }
                util_1.deleteLocalFiles([localFile]);
            });
        }
        catch (e) {
            console.log('ERROR', e);
            res.status(500).end(e);
        }
    }));
    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map