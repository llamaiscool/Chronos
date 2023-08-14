class Boss {
    constructor(name, openDelay, windowLength) {
        this.name = name;
        this.openDelay = min_to_ms(openDelay); // converts respawn time from minutes to milliseconds
        this.closeDelay = this.openDelay + min_to_ms(windowLength); // convert window length from minutes to milliseconds
        this.spawnTimestamp = null;
        this.killTime = null;
    }

    resetTimer() {
        const now = new Date();
        this.killTime = now.getTime();
        this.spawnTimestamp = this.killTime + this.openDelay;
    }

    // returns window open time in string format
    getTimeUntilBossIsOpen() {
        if (this.spawnTimestamp == null) return this.name + " -- unknown";
        const now = new Date();
        let remaining =  this.spawnTimestamp - now.getTime();
        
        const milliseconds_per_day = 24 * 60 * 60 * 1000;
        const milliseconds_per_hour = 60 * 60 * 1000;
        const milliseconds_per_minute = 60 * 1000;
        const milliseconds_per_second = 1000;
        let days, hours, minutes, seconds = 0;

        while (true) {
            if      (remaining - milliseconds_per_day >= 0) {
                days++;
                remaining -= milliseconds_per_day;
            }
            else if (remaining - milliseconds_per_hour >= 0) {
                hours++;
                remaining -= milliseconds_per_hour;
            }
            else if (remaining - milliseconds_per_minute >= 0) {
                minutes++;
                remaining -= milliseconds_per_minute;
            }
            else if (remaining - milliseconds_per_second >= 0) {
                seconds++;
                remaining -= milliseconds_per_second;
            }
            else {
                // remaining < 1 second
                break;
            }
        }

        if (this.spawnTimestamp - now.getTime() < 1000) return this.name + " -- Open now";
        else {
            console.log("window in future for " + this.name)
            const return_string = this.name + " in "
                    +   ((days == 0) ? "" : (days + " day" + ((days > 1) ? "s" : "") + ", "))
                    +   ((hours == 0) ? "" : (hours + " day" + ((hours > 1) ? "s" : "") + ", "))
                    +   ((minutes == 0) ? "" : (minutes + " day" + ((minutes > 1) ? "s" : "") + ", "))
                    +   ((seconds == 0) ? "" : (seconds + " day" + ((seconds > 1) ? "s" : "") + ", "))
            console.log("returning: ", return_string);
            return return_string
        }
    }
    }

    // getTimeRemainingUntilClosed() {
    //     return this.getCloseTime() - Date.getTime();
    // }

    // //returns window open time as milliseconds since last epoch
    // getOpenTime() {
    //     if (this.killTime == null) return null;
    //     return this.killTime + this.openDelay;
    // }

    // // returns window close time as milliseconds since last epoch
    // getCloseTime() {
    //     if (this.killTime == null) return null;
    //     return this.killTime + this.closeDelay;
    // }

}

function min_to_ms(minutes) {
    return minutes * 60 * 1000;
}


module.exports = Boss;