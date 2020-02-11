const AccountFormHeader = ({ title, subtitle }) => (
	<span className="text-center dark-green-text">
		<h2 className="text-uppercase page-title">{title}</h2>
		<p>{subtitle}</p>
		<style jsx>{`
			.dark-green-text {
				color: #094c3a;
			}	
		`}</style>
	</span>
)

export default AccountFormHeader