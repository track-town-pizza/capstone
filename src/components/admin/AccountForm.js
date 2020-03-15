const AccountForm = props => (
	<form className="border custom-border px-3 pt-3">
		{props.children}
		<style jsx>{`
			.custom-border {
				border-radius: 10px;
			}
		`}</style>
	</form>
)

export default AccountForm