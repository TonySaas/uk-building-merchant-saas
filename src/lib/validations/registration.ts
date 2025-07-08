import { z } from 'zod'

// Base user information schema
export const userInfoSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(val), {
      message: 'Please enter a valid UK phone number'
    })
})

// Password validation schema
export const passwordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// User type and role selection schema
export const userTypeSchema = z.object({
  userType: z.enum(['supplier', 'merchant', 'consumer'], {
    required_error: 'Please select a user type'
  }),
  role: z.string().min(1, 'Please select a role')
})

// Organization selection schema
export const organizationSchema = z.object({
  organizationIds: z.array(z.string())
    .min(1, 'Please select at least one organization')
    .max(4, 'You can select up to 4 organizations')
})

// Company information schema (for suppliers and merchants)
export const companyInfoSchema = z.object({
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  jobTitle: z.string()
    .min(2, 'Job title must be at least 2 characters')
    .max(50, 'Job title must be less than 50 characters')
    .optional()
})

// Address information schema
export const addressSchema = z.object({
  addressLine1: z.string()
    .min(5, 'Address line 1 must be at least 5 characters')
    .max(100, 'Address line 1 must be less than 100 characters')
    .optional(),
  addressLine2: z.string()
    .max(100, 'Address line 2 must be less than 100 characters')
    .optional(),
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .optional(),
  county: z.string()
    .min(2, 'County must be at least 2 characters')
    .max(50, 'County must be less than 50 characters')
    .optional(),
  postalCode: z.string()
    .regex(/^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i, 
      'Please enter a valid UK postal code')
    .optional(),
  country: z.string().default('United Kingdom')
})

// Terms and privacy schema
export const agreementSchema = z.object({
  termsAccepted: z.boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions'
    }),
  privacyAccepted: z.boolean()
    .refine((val) => val === true, {
      message: 'You must accept the privacy policy'
    }),
  marketingAccepted: z.boolean().optional()
})

// Complete registration schema
export const registrationSchema = z.object({
  // Step 1: User type selection
  userType: userTypeSchema.shape.userType,
  
  // Step 2: Organization selection (optional for consumers)
  organizationIds: z.array(z.string()).optional(),
  
  // Step 3: Role selection
  role: userTypeSchema.shape.role,
  
  // Step 4: Personal information
  ...userInfoSchema.shape,
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  
  // Step 5: Company information (conditional)
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  
  // Step 6: Address (optional)
  address: addressSchema.optional(),
  
  // Step 7: Agreements
  ...agreementSchema.shape
}).superRefine((data, ctx) => {
  // Password confirmation validation
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords don't match",
      path: ['confirmPassword']
    })
  }
  
  // Conditional validation based on user type
  if (data.userType === 'supplier' || data.userType === 'merchant') {
    // Company name is required for suppliers and merchants
    if (!data.companyName || data.companyName.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Company name is required for suppliers and merchants',
        path: ['companyName']
      })
    }
    
    // Organizations are required for suppliers and merchants
    if (!data.organizationIds || data.organizationIds.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select at least one organization',
        path: ['organizationIds']
      })
    }
  }
})

// Step-specific schemas for wizard validation
export const stepSchemas = {
  1: userTypeSchema.pick({ userType: true }),
  2: z.object({ organizationIds: z.array(z.string()).optional() }),
  3: userTypeSchema.pick({ role: true }),
  4: userInfoSchema.merge(z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
  })).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }),
  5: companyInfoSchema.partial(),
  6: addressSchema,
  7: agreementSchema
}

// Email availability validation
export const emailAvailabilitySchema = z.object({
  email: z.string().email('Please enter a valid email address')
})

// Types
export type RegistrationFormData = z.infer<typeof registrationSchema>
export type UserInfo = z.infer<typeof userInfoSchema>
export type PasswordData = z.infer<typeof passwordSchema>
export type UserTypeData = z.infer<typeof userTypeSchema>
export type OrganizationData = z.infer<typeof organizationSchema>
export type CompanyInfo = z.infer<typeof companyInfoSchema>
export type AddressInfo = z.infer<typeof addressSchema>
export type AgreementData = z.infer<typeof agreementSchema>

// Validation utilities
export const validateStep = (step: number, data: any) => {
  const schema = stepSchemas[step as keyof typeof stepSchemas]
  if (!schema) return { success: true }
  
  return schema.safeParse(data)
}

export const validateEmail = (email: string) => {
  return emailAvailabilitySchema.safeParse({ email })
}

export const validatePassword = (password: string) => {
  return z.object({ password: z.string().min(8, 'Password must be at least 8 characters') }).safeParse({ password })
}