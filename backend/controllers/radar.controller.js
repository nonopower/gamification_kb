const db = require('../models');
const Radar = db.Radar;
const User = db.User;

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {
        include: [{
            model: Radar
        }]
    })
        .then(data => {
            if (data) {
                res.send(data.Radar);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};

exports.updateScore = async (req, res) => {
    const userid = req.query.id;
    const { idea, reply, ask, record, experiment, info } = req.body;
    const user = await User.findByPk(userid, {
        include: [{
            model: Radar
        }]
    });
    const id = user.id;

    try {
        const radar = await Radar.findByPk(id);
        if (radar) {
            radar.idea = idea;
            radar.reply = reply;
            radar.ask = ask;
            radar.record = record;
            radar.experiment = experiment;
            radar.info = info;
            await radar.save();

            res.send({ message: "updated successfully." });
        } else {
            res.status(404).send({ message: "Radar not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating idea and scores." });
    }
};

exports.updateIdeaScore = async (req, res) => {
    const userid = req.body.id;
    const newIdea = req.body.idea;
    const user = await User.findByPk(userid, {
        include: [{
            model: Radar
        }]
    });
    const id = user.id;
    try {
        const radar = await Radar.findByPk(id);
        if (radar) {
            radar.idea = newIdea;
            await radar.save();

            res.send({ message: "Idea updated successfully." });
        } else {
            res.status(404).send({ message: "Radar not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating idea." });
    }
};

exports.updateReplyScore = async (req, res) => {
    const id = req.body.id;
    const newReply = req.body.reply;

    try {
        const radar = await Radar.findByPk(id);
        if (radar) {
            radar.reply = newReply;
            await radar.save();

            res.send({ message: "Reply updated successfully." });
        } else {
            res.status(404).send({ message: "Radar not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating reply." });
    }
};

exports.updateAskScore = async (req, res) => {
    const userid = req.body.id;
    const newAsk = req.body.ask;
    const user = await User.findByPk(userid, {
        include: [{
            model: Radar
        }]
    });
    const id = user.id;
    try {
        const radar = await Radar.findByPk(id);
        if (radar) {
            radar.ask = newAsk;
            await radar.save();

            res.send({ message: "Ask updated successfully." });
        } else {
            res.status(404).send({ message: "Radar not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating ask." });
    }
};

exports.updateRecordScore = async (req, res) => {
    const userid = req.body.id;
    const newRecord = req.body.record;
    const user = await User.findByPk(userid, {
        include: [{
            model: Radar
        }]
    });
    const id = user.id;
    try {
        const radar = await Radar.findByPk(id);
        if (radar) {
            radar.record = newRecord;
            await radar.save();

            res.send({ message: "Record updated successfully." });
        } else {
            res.status(404).send({ message: "Radar not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating record." });
    }
};

exports.updateExperimentScore = async (req, res) => {
    const userid = req.body.id;
    const newExperiment = req.body.experiment;
    const user = await User.findByPk(userid, {
        include: [{
            model: Radar
        }]
    });
    const id = user.id;
    try {
        const radar = await Radar.findByPk(id);
        if (radar) {
            radar.experiment = newExperiment;
            await radar.save();

            res.send({ message: "Experiment updated successfully." });
        } else {
            res.status(404).send({ message: "Radar not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating experiment." });
    }
};

exports.updateInfoScore = async (req, res) => {
    const userid = req.body.id;
    const newInfo = req.body.info;
    const user = await User.findByPk(userid, {
        include: [{
            model: Radar
        }]
    });
    const id = user.id;
    try {
        const radar = await Radar.findByPk(id);
        if (radar) {
            radar.info = newInfo;
            await radar.save();

            res.send({ message: "Info updated successfully." });
        } else {
            res.status(404).send({ message: "Radar not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating info." });
    }
};