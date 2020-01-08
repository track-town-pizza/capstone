export default (req, res) => {
	res.status(200).json({
		quote: 'Quote.',
		author: 'Author'
	});
};
