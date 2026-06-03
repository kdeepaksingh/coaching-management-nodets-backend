/**
 * @swagger
 * components:
 *   schemas:
 *
 *     VerifyOtpRequest:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *       properties:
 *         email:
 *           type: string
 *           example: deepak@gmail.com
 *         otp:
 *           type: string
 *           example: "123456"
 *
 *     ResendOtpRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: deepak@gmail.com
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: deepak@gmail.com
 *         password:
 *           type: string
 *           example: Password@123
 *
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: deepak@gmail.com
 *
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *         - newPassword
 *       properties:
 *         email:
 *           type: string
 *           example: deepak@gmail.com
 *         otp:
 *           type: string
 *           example: "123456"
 *         newPassword:
 *           type: string
 *           example: NewPassword@123
 */
export {};
