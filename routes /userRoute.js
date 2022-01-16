const authController = require("../controllers /authController");
const router = require("express").Router();
const catchAsync = require("../utils /catchAsync");
const userController = require("../controllers /userController");

router.route("/signup").post(catchAsync(authController.signUp));
router.route("/login").post(catchAsync(authController.logIn));
router.route("/forgotPassword").post(catchAsync(authController.forgotPassword));
router
  .route("/resetPassword/:token")
  .patch(catchAsync(authController.resetPassword));

router
  .route("/updateMyPassword")
  .patch(
    authController.protectMiddleware,
    catchAsync(authController.updatePassword)
  );

router
  .route("/updateMe")
  .patch(authController.protectMiddleware, catchAsync(userController.updateMe));

router
  .route("/deleteMe")
  .delete(
    authController.protectMiddleware,
    catchAsync(userController.deleteMe)
  );
router.route("/").get(catchAsync(userController.getAllUsers));
router
  .route("/me")
  .get(
    authController.protectMiddleware,
    userController.getMe,
    userController.getUser
  );

router
  .route("/:id")
  .get(catchAsync(userController.getUser))
  .delete(userController.deleteUser)
  .patch(
    authController.protectMiddleware,
    authController.restrictTo("admin"),
    catchAsync(userController.updateUser)
  );

module.exports = router;
