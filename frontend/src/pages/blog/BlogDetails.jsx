import { useParams, Link } from "react-router-dom";
import blogData from "./blogData.js";
import { User, Clock2, ArrowLeft  } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Blog Not Found
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-5">
      <div className="p-8">
        {/* Back Button */}
        <div className="flex items-center gap-2 text-xl text-slate-600 leading-relaxed font-bold">
          <Link
            to="/blog"
            className="text-sm text-[#ec6d13] mb-6 flex gap-2 hover:scale-105 transition duration-300 ease-in-out"
          >
            <ArrowLeft size={20} /> Back to Blogs
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
          {blog.title}
        </h1>

        {/* Author and Date */}
        <div className="text-sm text-gray-500 mb-8 flex flex-col items-start gap-5 md:items-center md:flex-row">
          <div className="flex items-center gap-2 text-xl text-slate-600 font-light">
            <User size={20} />
            By {blog.author}
          </div>
          <div className="flex items-center gap-2 text-xl text-slate-600 font-light">
            <Clock2 size={20} />
            {/* <p>{new Date(blog.date).toDateString()}</p> */}
            <p>
              {new Date(blog.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

          </div>
        </div>

        {/* Featured Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-xl md:h-130 object-cover object-center"
        />

        {/* Content */}
        <div className="leading-relaxed space-y-8 whitespace-pre-line text-xl text-slate-600 font-light">
          <p className="">{blog.content}</p>
        </div>

        {/* Question */}
        <div className="space-y-8 whitespace-pre-line text-md text-xl text-slate-600 leading-relaxed font-light mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{blog.question}</h2>
          {blog.answer}
        </div>

        {/* Paragraph */}
        <div className="text-xl text-slate-600 leading-relaxed font-light mb-8 bg-[#ec6d130d] border-l-4 border-[#ec6d13] pl-6 py-2 my-8 italic md:text-xl font-serif">
          <p>" {blog.para} "</p>
        </div>


        {/* Compare Content with images */}
        <div className="grid md:grid-cols-2 md:gap-8 items-center space-y-8">
          <img
            src={blog.compareImage1}
            alt={blog.compareHeading1}
            className="rounded-xl w-full md:h-72 object-cover shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out"
          />

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {blog.compareHeading1}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light">{blog.compareContent1}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-8 items-center space-y-8 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {blog.compareHeading2}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light">{blog.compareContent2}</p>
          </div>

           <img
            src={blog.compareImage2}
            alt={blog.compareHeading2}
            className="rounded-xl w-full md:h-72 object-cover shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>

        <div className="text-xl text-slate-600 leading-relaxed font-light mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{blog.conclusion}</h2>
          {blog.conclusionContent}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
