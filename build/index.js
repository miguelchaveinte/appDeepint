"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_routes_1 = __importDefault(require("./routes/posts_routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing application/json
const PORT = 3000;
// use the routes provided by the posts module
app.use('/posts', posts_routes_1.default);
app.get('/', (_, res) => {
    res.send('Probando typescript y fetch');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
