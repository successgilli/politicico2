
function isAdmin(req, res, next) {
  if (!req.isAdmin) {
    res.status(401).json({
      status: 401,
      message: 'only for admin',
    });
  } else {
    next();
  }
}

export default isAdmin;
