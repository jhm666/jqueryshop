module.exports = async (req, res) => {
	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
		const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}\"`
		res.send(s)
	}else {
		var url = req.query.url || '/admin/login.html'
		res.send(`location.href = '${url}'`)
	}
};
