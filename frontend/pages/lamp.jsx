const Index = () => {
	return (
		<>
			<div className="row min-vh-100 align-items-center text-black pt-md-2 pb-md-4">
				<div className="col-lg-6 col-12 mt-5">
					<div class="form-check form-switch" style={{ fontSize: "50px" }}>
						<input
							class="form-check-input"
							type="checkbox"
							defaultChecked={false}
							onClick={(e) => {
								console.log(e.target.checked);
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
