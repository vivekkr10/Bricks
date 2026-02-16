import { Link } from "react-router-dom";

const FeaturedBlog = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="grid md:grid-cols-2 gap-8 items-center group">
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-xl w-full h-72 object-cover shadow-md hover:shadow-lg group-hover:scale-105 transition duration-300 ease-in-out"
        />

        <div>
          <p className="text-sm text-[#ec6d13] mb-2">
            {new Date(blog.date).toDateString()}
          </p>

          <h2 className="text-3xl font-bold mb-4">
            {blog.title}
          </h2>

          <p className="text-gray-600 mb-4">
            {blog.description}
          </p>

          <div className="text-sm text-gray-500">
            By {blog.author}
          </div>

          <p className="inline-flex items-center mt-5 text-[#ec6d13] font-bold text-xs uppercase tracking-widest border-b-2 border-[#ec6d13]/20 pb-0.5 group-hover:border-[#ec6d13] transition-all">Read Full Article</p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedBlog;
