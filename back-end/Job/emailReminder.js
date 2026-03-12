const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Task = require("../models/Task");
const User = require("../models/User");

require("dotenv").config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

cron.schedule("0 8 * * *", async () => {

    console.log("Running daily email reminder...");

    try {

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const tasks = await Task.find({
            date: { $gte: startOfDay, $lte: endOfDay },
            completed: false
        }).populate("userId");

        const userTasksMap = {};

        tasks.forEach(task => {
            const user = task.userId;
            if (!user) return;
            if (!userTasksMap[user._id]) {
                userTasksMap[user._id] = [];
            }

            userTasksMap[user._id].push(task);

        });


        for (const userId in userTasksMap) {

            const userTasks = userTasksMap[userId];
            const user = userTasks[0].userId;
            let message = "Hello!\n\nHere are your tasks for today:\n\n";

            userTasks.forEach(task => {
                message += `• ${task.title}\n`;
            });

            message += "\nGood luck today! 🚀";

            const mailOptions = {
                from: "o1m1a1e1@gmail.com",
                to: user.email,
                subject: "Your tasks for today",
                text: message
            };
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.email}`);
        }

    } catch (error) {

        console.error("Email reminder error:", error);

    }

});