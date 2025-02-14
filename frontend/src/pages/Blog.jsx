import React from 'react';
import './Blog.css';  // Import the CSS for Blog page

const Blog = () => {
    const blogs = [
        {
            id: 1,
            title: "Why Car Rentals are a Great Choice for Travelers",
            content: "Car rentals provide a great option for travelers who want flexibility and convenience when exploring new destinations. Renting a car allows you to travel at your own pace and visit off-the-beaten-path locations that may not be accessible by public transport.",
            date: "2025-01-10",
        },
        {
            id: 2,
            title: "Top Tips for First-Time Renters",
            content: "If you're renting a car for the first time, there are some key tips to keep in mind. Always inspect the vehicle for damages before signing the rental agreement, and make sure you understand the insurance coverage offered by the rental company.",
            date: "2025-01-15",
        },
        {
            id: 3,
            title: "Choosing the Right Car for Your Vacation",
            content: "When renting a car, it's important to choose a vehicle that suits your needs. For a family vacation, an SUV or a minivan might be the best option. For a solo trip, a compact or economy car could offer better fuel efficiency and easier parking.",
            date: "2025-01-18",
        },
    ];

    return (
        <div className="blog">
            <h1>Our Blog</h1>
            {blogs.length === 0 ? (
                <p>No blog posts available at the moment.</p>
            ) : (
                blogs.map((blog) => (
                    <div key={blog.id} className="blog-post">
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <p><small>{new Date(blog.date).toLocaleDateString()}</small></p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Blog;
