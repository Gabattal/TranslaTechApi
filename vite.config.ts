/// <reference types='vitest' />
import {defineConfig, UserConfig} from "vite";
import * as path from "path";

const alias = {
    "@": path.resolve(__dirname, "src")
}
export default defineConfig(() => {
    const config: UserConfig = {
        resolve: {
            alias
        },
        server: {
            host: "127.0.0.1"
        },
        test: {
            api: {
                port: 2023
            }
        }
    }
    return config
})