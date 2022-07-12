const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HabitSchema = new Schema(
    {
        action: {
            type: String
        }
    }
);

const Habits = mongoose.model('habits', HabitSchema);

module.exports = Habits;