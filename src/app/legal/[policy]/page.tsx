import { Client } from '@notionhq/client'
import moment from 'moment'

import Content from './content'
import { redirect } from 'next/navigation'

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

export default async function Policy({ params }: { params: { policy: string } }) {
    const database = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE as string
    })

    var page = null
    for (let i = 0; i < database.results.length; i++) {
        const data = database.results[i] as any

        if (data.properties.ID.rich_text[0].plain_text == params.policy) {
            page = data
            break
        }
    }

    if (page === null) {
        return redirect('/')
    }

    const response = await notion.blocks.children.list({
        block_id: page.id
    })

    var content = ''
    for (let w = 0; w < response.results.length; w++) {
        const block = response.results[w] as any

        if (block.type == 'paragraph') {
            for (let i = 0; i < block.paragraph.rich_text.length; i++) {
                const text = block.paragraph.rich_text[i]

                if (text.href !== null) {
                    content += `<a href="${text.href}" class="mb-4 text-primary">
                    ${text.plain_text}
                    </a>`
                } else {
                    content += `<span class="mb-4">
                    ${text.plain_text}
                    </span>`
                }
            }
        } else if (block.type == 'heading_3') {
            content += `<h3 class="text-xl font-bold mb-2">
            ${block.heading_3.rich_text[0].plain_text}
            </h3>`
        }
    }

    if (content === '') {
        content = `<p class="mb-4">
        No content found.
        </p>`
    }

    return (
        <div className="container pt-12 pb-12">
            <Content
                title={page.properties.Name.title[0].plain_text}
                content={content}
                lastUpdated={moment(page.properties['Last edited'].last_edited_time).format('DD MMMM YYYY')}
                effectiveDate={moment(page.properties['Last edited'].last_edited_time).add(12, 'days').format('DD MMMM YYYY')}
            />
        </div>
    )
}