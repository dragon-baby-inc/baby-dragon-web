const normalizeGroupUser = (user) => {
  return {
    id: user.line_id,
    displayName: user.display_name,
    imageURL: user.image_url,
    imageId: user.image_id,
    fromLine: user.from_line,
    coverCost: user.cover_cost,
    restrictedDestroy: user.restricted_destroy,
    restrictedCoverCost: user.restricted_cover_cost
  }
}

export {
  normalizeGroupUser
}
