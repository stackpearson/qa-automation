export {};

declare global {
    namespace NodeJS {
        interface Global {
            user?: number;
        }
    }
}