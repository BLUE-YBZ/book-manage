const getMate = () => {
    return {
        createAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
        updatedAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
    };
};

const preSave = function (next) {
    if (this.isNew) {
        const ts = Date.now();

        this['meta'].createAt = ts;
        this['meta'].updatedAt = ts;
    } else {
        this['meta'].updatedAt = Date.now();
    }

    next();
};
module.exports = {
    getMate,
    preSave
}