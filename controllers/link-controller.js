import { nanoid } from 'nanoid'
import { Link } from '../models/Link.js'

export const getLinks = async (req, res) => {
  try {

    const links = await Link.find({ uid: req.uid })
    
    return res.json({ links })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const getLink = async (req, res) => {
  try {
    const { nanoLink } = req.params
    const link = await Link.findOne({ nanoLink })

    if (!link) return res.status(404).json({ error: 'No existed link' })
    
    return res.json({ longLink: link.longLink })
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Incorrect form to id'})
    }
    return res.status(500).json({ error: 'Server error'})
  }
}

export const getLinkCRUD = async (req, res) => {
  try {
    const { id } = req.params
    const link = await Link.findById(id)

    if (!link) return res.status(404).json({ error: 'No existed link' })

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: 'Incorrect id' })
    }
    
    return res.json({ link })
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Incorrect form to id'})
    }
    return res.status(500).json({ error: 'Server error'})
  }
}

export const createLink = async (req, res) => {
  try {
    let { longLink } = req.body
    if (!longLink.startsWith('https://')) {
      longLink = 'https://' + longLink
    }
    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid })
    const newLink = await link.save()

    return res.status(201).json({ newLink })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params
    const link = await Link.findById(id)

    if (!link) return res.status(404).json({ error: 'No existed link' })

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: 'Incorrect id' })
    }
    
    await link.remove()

    return res.json({ link })
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Incorrect form to id'})
    }
    return res.status(500).json({ error: 'Server error'})
  }
}

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params
    const { longLink } = req.body
    const link = await Link.findById(id)

    if (!link) return res.status(404).json({ error: 'No existed link' })

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: 'Incorrect id' })
    }
    
    link.longLink = longLink
    await link.save()

    return res.json({ link })
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Incorrect form to id'})
    }
    return res.status(500).json({ error: 'Server error'})
  }
}
