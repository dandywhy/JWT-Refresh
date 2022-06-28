import { Link } from "../models/Link.js"

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params
    const link = await Link.findOne({ nanoLink })

    if (!link) return res.status(404).json({ error: 'No existed link' })
    
    return res.redirect(link.longLink)
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Incorrect form to id'})
    }
    return res.status(500).json({ error: 'Server error'})
  }
}