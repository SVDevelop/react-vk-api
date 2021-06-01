import useVK from "../VK";

export default function LoginPage(props) {
	const { login } = useVK();
	return <button onClick={login}>Авторизоваться</button>;
}
