module.exports = {
    jwtSecret : process.env.SECRET || "MyS3cr3tK3Y",
    jwtSession: false,
    ExpirationTime: (60*60) * 3600
};
