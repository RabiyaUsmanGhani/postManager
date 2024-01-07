import axios from "axios";
import Link from "next/link";

async function isLoggedIn(id: number) {
  if(id){
try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = response.data;

    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error to the caller
  }
  }
  
}

const PostDetail = async (props: any) => {
  let id = props.params.id[0];
  const post = await isLoggedIn(id);

  
  
  return (
    <div className="row">
      <div className="col-md-12 p-5">
        <Link
          className="btn btn-primary mb-3 w-100"
          href={{
            pathname: `/`,
          }}>
          Back
        </Link>
        <div className="card  text-center">
          <div className="card-body ">
            <h5 className="card-title">{post?.title}</h5>
            <p className="card-text  m-auto">{post?.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
