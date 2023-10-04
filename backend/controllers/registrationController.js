

const userRegistration = (req, res) => {

    console.log(req.body);

    const newErrorText = [];

    if (req.body.username.length < 4) {
        newErrorText.push("Username must be at least 4 characters long.");
    }

    if (req.body.username.length > 20) {
        newErrorText.push("Username must be less than 20 characters long.");
    }

    if (req.body.password_1.length < 4) {
        newErrorText.push("Password must be at least 4 characters long.");
    }

    if (req.body.password_1.length > 20) {
        newErrorText.push("Password must be less than 20 characters long.");
    }

    if (/[A-Z]/.test(req.body.password_1) === false) {
        newErrorText.push("Password must include an uppercase letter.");
    }

    if (req.body.password_1 !== req.body.password_2) {
        newErrorText.push("Password must match.");
    }

    if (newErrorText.length === 0) {
        res.json({ registration: "ok" });
    } else {
        res.json({ error: newErrorText })
    }


};


export default userRegistration;
