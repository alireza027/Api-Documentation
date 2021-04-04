<template>
	<div class="authentication">
		<div class="auth-container">
			<div class="auth-title-container">
				<h3 class="title">Login Page</h3>
			</div>

			<form class="auth-inputs" @submit.prevent="LoginSection()">
				<div class="auth-input-container">
					<label for="email-input" class="input-label">Email</label>

					<input
						type="email"
						v-model="email"
						class="input"
						id="email-input"
						placeholder="please enter your email : "
					/>

					<p
						class="auth-error"
						:class="emailError.length > 0 ? 'd-block' : 'd-none'"
					>
						{{ emailError }}
					</p>
				</div>

				<div class="auth-input-container">
					<label for="password-input" class="input-label">Password</label>

					<input
						type="password"
						v-model="password"
						class="input"
						id="password-input"
						placeholder="please enter your password : "
					/>

					<p
						class="auth-error"
						:class="passwordError.length > 0 ? 'd-block' : 'd-none'"
					>
						{{ passwordError }}
					</p>
				</div>

				<button type="submit" class="auth-button">Login</button>

				<router-link to="/register" class="send-to-other-section"
					>Create New Account</router-link
				>
			</form>
		</div>
	</div>
</template>

<script>
	import HasToken from "../middleware/hasToken";

	export default {
		data() {
			return {
				email: "",

				emailError: "",

				password: "",

				passwordError: "",
			};
		},

		beforeCreate() {
			if (HasToken() == true) {
				this.$router.push("/");
			}
		},

		methods: {
			LoginSection() {
				if (
					/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						this.email
					) == false
				) {
					this.emailError = "Your email address is invalid";
					this.passwordError = "";
				} else if (
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(this.password) ==
					false
				) {
					this.emailError = "";
					this.passwordError = "Your password is invalid";
				} else {
					this.emailError = "";
					this.passwordError = "";

					fetch("http://localhost:8000/auth/signin", {
						mode: "cors",

						method: "POST",

						body: JSON.stringify({
							email: this.email,
							password: this.password,
						}),

						headers: {
							"Content-Type": "application/json",
						},
					})
						.then((signinResponse) => {
							signinResponse
								.json()
								.then((dataResponse) => {
									if (dataResponse.code == 400) {
										this.emailError = "Email is wrong";
										this.passwordError = "Password is wrong";
									} else {
										window.localStorage.setItem(
											"api-token",
											dataResponse.token
										);
										this.$router.push("/");
									}
								})
								.catch((error) => {
									console.log(error);
								});
						})
						.catch((error) => {
							console.log(error);
						});
				}
			},
		},
	};
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		border: 0;
		box-sizing: border-box;
	}

	.d-none {
		display: none;
	}

	.d-block {
		display: block;
	}

	.authentication {
		background: linear-gradient(to bottom right, #536976, #292e49);
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.auth-container {
		max-width: 450px;
		width: 300px;
		background: #fff;
		padding: 15px;
		border-radius: 5px;
	}

	.auth-title-container {
		text-align: center;
		margin-bottom: 30px;
		h3 {
			color: #292e49;
		}
	}

	.auth-inputs {
		width: 100%;

		.auth-input-container {
			margin-bottom: 15px;

			.input-label {
				display: block;
				margin-bottom: 6px;
				font-size: 14px;
			}

			.input {
				border: 1px solid #292e49;
				padding: 12px 15px;
				border-radius: 5px;
				display: block;
				width: 100%;
			}
		}

		.auth-button {
			width: 100%;
			padding: 12px 0;
			background: #292e49;
			color: #fff;
			border-radius: 5px;
			cursor: pointer;
		}

		.auth-error {
			color: red;
			font-size: 12px;
			margin: 8px 8px 0;
		}

		.send-to-other-section {
			color: #292e49;
			text-align: center;
			margin-top: 10px;
			font-size: 14px;
			text-decoration: none;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;

			&:hover {
				text-decoration: none;
			}
		}
	}
</style>
