import Login from "./login";

export default function Home() {
  // const [message, setMessage] = useState("");
  // let router = useRouter();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8088/test/get")
  //     .then((response) => {
  //       setMessage(response.data); 
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <main>
      <Login />
    </main>
  );
}
