import express from 'express'

import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes'
import { convertMinutesToHourString } from './utils/convertMinutesToHourString copy'

const app = express()
app.use(express.json())
app.use(cors({
    // origin: ''
}))

const prisma = new PrismaClient({
    // log: ['query']
})

app.get('/games', async (_, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })
    return response.json(games)
})


app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id
    const body = request.body

    const AdValidate =
        z.object({
            name: z.string(),
            discord: z.string(),
            weekDays: z.array(z.number()),
            useVoiceChannel: z.boolean(),
            yearsPlaying: z.number(),
            hourStart: z.string(),
            hourEnd: z.string(),
        }).safeParse(body)

    if (!AdValidate.success) {
        return response.status(500).json(AdValidate.error.issues)
    }

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            useVoiceChannel: body.useVoiceChannel,
            yearsPlaying: body.yearsPlaying,
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
        }
    })

    return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId
        }
    })
    return response.json(ad)
})
app.listen(3333)