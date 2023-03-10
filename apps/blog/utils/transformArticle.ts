import { ResponseArticleDataType, PaginationType } from 'types'

export interface ArticleDataType {
  id: number
  slug: string
  title: string
  locale: string
  imgUrl: string
  content: string
  createAt: string
  publishedAt: string
  description: string
  categories: Array<string>
}

export interface ArticleType {
  data: ArticleDataType[]
  pagination: PaginationType
}

export const transformArticle = (article: ResponseArticleDataType): ArticleDataType => {
  return {
    id: article.id,
    slug: article?.attributes?.slug ?? '',
    title: article?.attributes?.title ?? '',
    content: article?.attributes?.content
      ? process.env.STRAPI_OLD_IMAGE_HOST
        ? article?.attributes?.content.replaceAll(
            process.env.STRAPI_OLD_IMAGE_HOST,
            'https://blog-cdn.pancakeswap.finance',
          )
        : article?.attributes?.content
      : '',
    createAt: article?.attributes?.createAt ?? '',
    publishedAt: article?.attributes?.publishedAt ?? '',
    locale: article?.attributes?.locale ?? '',
    description: article?.attributes?.description ?? '',
    imgUrl: article?.attributes?.image?.data?.[0]?.attributes?.hash
      ? `https://blog-cdn.pancakeswap.finance/${article?.attributes?.image?.data?.[0]?.attributes?.hash}${article?.attributes?.image?.data?.[0]?.attributes?.ext}`
      : '',
    categories: article.attributes?.categories?.data?.map((i) => i.attributes.name),
  }
}
