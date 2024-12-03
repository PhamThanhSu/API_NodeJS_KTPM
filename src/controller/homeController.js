import { render } from 'ejs';
const handleHomePage = (req, res) => {
    return res.render("home.ejs");
}

module.exports = {
    handleHomePage,
};