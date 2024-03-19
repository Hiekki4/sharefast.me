export default async function Content({ title, content, lastUpdated, effectiveDate }: any) {
    return (
        <div>
            <div className="mb-5">
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="mt-1 ml-1">
                    <span className="font-bold">Last Updated: </span>
                    <span>{lastUpdated}</span>
                    <br />
                    <span className="font-bold">Effective Date: </span>
                    <span>{effectiveDate}</span>
                </p>
            </div>
            <div className="ml-1" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}