/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *
 *     UserProfile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         roleType:
 *           type: string
 *         profilePicture:
 *           type: string
 *         gender:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         address:
 *           type: string
 *         isEmailVerified:
 *           type: boolean
 *         isMobileVerified:
 *           type: boolean
 *         isActive:
 *           type: boolean
 *         lastLogin:
 *           type: string
 *           format: date-time
 *
 *     UpdateProfileRequest:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         gender:
 *           type: string
 *           enum:
 *             - male
 *             - female
 *             - other
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         address:
 *           type: string
 *         profilePicture:
 *           type: string
 */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *
//  *     RegisterRequest:
//  *       type: object
//  *       required:
//  *         - fullName
//  *         - email
//  *         - mobileNumber
//  *         - roleType
//  *         - gender
//  *         - dateOfBirth
//  *         - address
//  *         - password
//  *       properties:
//  *         fullName:
//  *           type: string
//  *           example: Deepak Singh
//  *
//  *         email:
//  *           type: string
//  *           example: deepak@gmail.com
//  *
//  *         mobileNumber:
//  *           type: string
//  *           example: "9876543210"
//  *
//  *         roleType:
//  *           type: string
//  *           enum:
//  *             - admin
//  *             - teacher
//  *             - student
//  *             - parent
//  *           example: student
//  *
//  *         profilePicture:
//  *           type: string
//  *           example: https://example.com/profile.jpg
//  *
//  *         gender:
//  *           type: string
//  *           enum:
//  *             - male
//  *             - female
//  *             - other
//  *           example: male
//  *
//  *         dateOfBirth:
//  *           type: string
//  *           format: date
//  *           example: "1995-10-15"
//  *
//  *         address:
//  *           type: string
//  *           example: Varanasi, Uttar Pradesh
//  *
//  *         password:
//  *           type: string
//  *           format: password
//  *           example: Password@123
//  *
//  *     VerifyOtpRequest:
//  *       type: object
//  *       required:
//  *         - email
//  *         - otp
//  *       properties:
//  *         email:
//  *           type: string
//  *           example: deepak@gmail.com
//  *         otp:
//  *           type: string
//  *           example: "123456"
//  *
//  *     ResendOtpRequest:
//  *       type: object
//  *       required:
//  *         - email
//  *       properties:
//  *         email:
//  *           type: string
//  *           example: deepak@gmail.com
//  *
//  *     LoginRequest:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *       properties:
//  *         email:
//  *           type: string
//  *           example: deepak@gmail.com
//  *         password:
//  *           type: string
//  *           format: password
//  *           example: Password@123
//  *
//  *     ForgotPasswordRequest:
//  *       type: object
//  *       required:
//  *         - email
//  *       properties:
//  *         email:
//  *           type: string
//  *           example: deepak@gmail.com
//  *
//  *     ResetPasswordRequest:
//  *       type: object
//  *       required:
//  *         - email
//  *         - otp
//  *         - newPassword
//  *       properties:
//  *         email:
//  *           type: string
//  *           example: deepak@gmail.com
//  *         otp:
//  *           type: string
//  *           example: "123456"
//  *         newPassword:
//  *           type: string
//  *           format: password
//  *           example: NewPassword@123
//  *
//  *     ApiResponse:
//  *       type: object
//  *       properties:
//  *         success:
//  *           type: boolean
//  *           example: true
//  *
//  *         message:
//  *           type: string
//  *           example: Operation completed successfully
//  */
export {};
