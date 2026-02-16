import { Link } from "react-router-dom";

const SmallBlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 group">
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-lg w-full h-40 object-cover mb-4 group-hover:scale-105 transition duration-300 ease-in-out"
        />

        <p className="text-xs text-[#ec6d13] mb-1">
          {new Date(blog.date).toDateString()}
        </p>

        <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">{blog.description}</p>

        <p className="inline-flex items-center mt-5 text-[#ec6d13] font-bold text-xs uppercase tracking-widest border-b-2 border-[#ec6d13]/20 pb-0.5 group-hover:border-[#ec6d13] transition-all">Read Full Article</p>
      </div>
    </Link>
  );
};

export default SmallBlogCard;
