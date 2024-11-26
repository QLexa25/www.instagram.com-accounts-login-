const fs = require("fs");
const bcrypt = require("bcrypt");

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the data to be written to the file
    const data = `Username: ${username}, Hashed Password: ${hashedPassword}\n`;

    // Append data to the logins.txt file
    fs.appendFile("logins.txt", data, (err) => {
        if (err) {
            console.error("Error saving login details:", err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Login details saved to logins.txt");
            res.redirect("/welcome");
        }
    });
});

