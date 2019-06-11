module.exports = {
    port: 3000,
    // Of course the secret need to be in .env file that not committed to git but I hard code it here for simplicity
    jwtSecret: "BibL0T@ch-AP1",
    jwtSession: {session: false}
};