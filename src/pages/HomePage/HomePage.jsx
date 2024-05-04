import { BlogPreviewCard } from "../../components/BlogPreviewCard"

export const HomePage = () => {
    const blogPosts = [
        {
            title: 'lorem ipsum dolor sit amet, consectetur adipiscing',
            content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut labore et dolore mag at vero eos et dolore mag et dolore mag et',
            author: 'Arif Rama',
            id: 1
        },
        {
            title: 'lorem ipsum dolor sit amet, consectetur adipiscing',
            content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut labore et dolore mag at vero eos et dolore mag et dolore mag et',
            author: 'Putra',
            id: 2
        },
        {
            title: 'lorem ipsum dolor sit amet, consectetur adipiscing',
            content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut labore et dolore mag at vero eos et dolore mag et dolore mag et',
            author: 'Itachi',
            id: 3
        },
    ]

    return (
        <main className="py-10">
            <ul className="max-w-screen-xl flex flex-col gap-5 m-auto">
                {blogPosts && blogPosts.map(post => (
                    <BlogPreviewCard key={post.id} post={post} />
                ))}
            </ul>
        </main>
    )
}
