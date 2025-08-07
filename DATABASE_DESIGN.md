# Database Design Documentation

## Overview

This document outlines the database schema design for the Pharmacy Product Management System. The system uses MongoDB as the primary database with Mongoose ODM for schema management and data validation. The design is optimized for pharmacy operations with healthcare-specific requirements.

## Database Schema

### 1. Users Collection

**Collection Name**: `users`

**Schema**:
```javascript
{
  fullName: String,
  email: String,
  password: String,
  tokenUser: String,
  phone: String,
  avatar: String,
  friendList: [
    {
      user_id: String,
      room_chat_id: String
    }
  ],
  acceptFriends: Array,
  requestFriends: Array,
  statusOnline: String,
  status: String (default: "active"),
  deleted: Boolean (default: false),
  deletedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `email` (unique)
- `tokenUser` (unique)
- `status`

**Pharmacy-Specific Features**:
- Patient information management
- Prescription history tracking
- Health insurance information storage

### 2. Products Collection

**Collection Name**: `products`

**Schema**:
```javascript
{
  title: String,
  product_category_id: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  featured: String,
  position: Number,
  slug: String (unique),
  // Pharmacy-specific fields
  prescriptionRequired: Boolean,
  drugClass: String,
  dosageForm: String,
  strength: String,
  manufacturer: String,
  genericName: String,
  brandName: String,
  sideEffects: String,
  contraindications: String,
  interactions: String,
  storageInstructions: String,
  expiryDate: Date,
  createdBy: {
    account_id: String,
    createdAt: Date
  },
  deleted: Boolean (default: false),
  deletedBy: {
    account_id: String,
    deletedAt: Date
  },
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `slug` (unique)
- `product_category_id`
- `status`
- `featured`
- `prescriptionRequired`
- `drugClass`

### 3. Product Categories Collection

**Collection Name**: `product-categories`

**Schema**:
```javascript
{
  title: String,
  description: String,
  status: String,
  position: Number,
  slug: String (unique),
  // Pharmacy-specific fields
  categoryType: String, // "prescription", "otc", "medical-devices", "supplements"
  requiresPrescription: Boolean,
  ageRestriction: Number,
  createdBy: {
    account_id: String,
    createdAt: Date
  },
  deleted: Boolean (default: false),
  deletedBy: {
    account_id: String,
    deletedAt: Date
  },
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `slug` (unique)
- `status`
- `categoryType`

### 4. Accounts Collection

**Collection Name**: `accounts`

**Schema**:
```javascript
{
  fullName: String,
  email: String,
  password: String,
  token: String,
  phone: String,
  avatar: String,
  role_id: String,
  status: String (default: "active"),
  // Pharmacy-specific fields
  licenseNumber: String,
  specialization: String,
  pharmacyLocation: String,
  workingHours: String,
  deleted: Boolean (default: false),
  deletedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `email` (unique)
- `token` (unique)
- `role_id`
- `licenseNumber`

### 5. Roles Collection

**Collection Name**: `roles`

**Schema**:
```javascript
{
  title: String,
  description: String,
  permissions: {
    productCategory: {
      view: String,
      create: String,
      edit: String,
      delete: String
    },
    product: {
      view: String,
      create: String,
      edit: String,
      delete: String
    },
    account: {
      view: String,
      create: String,
      edit: String,
      delete: String
    },
    role: {
      view: String,
      create: String,
      edit: String,
      delete: String
    },
    // Pharmacy-specific permissions
    prescription: {
      view: String,
      verify: String,
      dispense: String
    },
    inventory: {
      view: String,
      manage: String,
      alerts: String
    },
    patient: {
      view: String,
      manage: String,
      history: String
    }
  },
  deleted: Boolean (default: false),
  deletedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Carts Collection

**Collection Name**: `carts`

**Schema**:
```javascript
{
  user_id: String,
  products: [
    {
      product_id: String,
      quantity: Number,
      // Pharmacy-specific fields
      prescription_id: String,
      dosageInstructions: String,
      refillDate: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `user_id`

### 7. Orders Collection

**Collection Name**: `orders`

**Schema**:
```javascript
{
  user_id: String,
  cart_id: String,
  userInfo: {
    fullName: String,
    phone: String,
    address: String
  },
  products: [
    {
      product_id: String,
      price: Number,
      discountPercentage: Number,
      quantity: Number,
      // Pharmacy-specific fields
      prescription_id: String,
      dosageInstructions: String,
      dispensedBy: String,
      dispensedAt: Date
    }
  ],
  // Pharmacy-specific fields
  orderType: String, // "prescription", "otc", "refill"
  prescriptionRequired: Boolean,
  insuranceInfo: {
    provider: String,
    policyNumber: String,
    groupNumber: String
  },
  deliveryMethod: String, // "pickup", "delivery"
  pickupTime: Date,
  deliveryAddress: String,
  status: String, // "pending", "verified", "dispensing", "ready", "delivered"
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `user_id`
- `cart_id`
- `orderType`
- `status`

### 8. Prescriptions Collection

**Collection Name**: `prescriptions`

**Schema**:
```javascript
{
  user_id: String,
  doctorName: String,
  doctorLicense: String,
  prescriptionDate: Date,
  expiryDate: Date,
  diagnosis: String,
  medications: [
    {
      product_id: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String,
      quantity: Number,
      refills: Number,
      refillsRemaining: Number
    }
  ],
  status: String, // "pending", "verified", "dispensed", "expired"
  verifiedBy: String,
  verifiedAt: Date,
  imageUrl: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `user_id`
- `status`
- `expiryDate`

### 9. Chats Collection

**Collection Name**: `chats`

**Schema**:
```javascript
{
  user_id: String,
  room_chat_id: String,
  content: String,
  messageType: String, // "text", "image", "file", "prescription"
  // Pharmacy-specific fields
  consultationType: String, // "general", "prescription", "side-effects"
  priority: String, // "low", "medium", "high", "urgent"
  assignedTo: String,
  status: String, // "open", "in-progress", "resolved"
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `user_id`
- `room_chat_id`
- `priority`
- `status`

### 10. Room Chats Collection

**Collection Name**: `room-chats`

**Schema**:
```javascript
{
  title: String,
  avatar: String,
  type: String,
  status: String,
  users: [
    {
      user_id: String,
      role: String
    }
  ],
  // Pharmacy-specific fields
  consultationType: String,
  patientInfo: {
    age: Number,
    medicalHistory: String,
    allergies: Array
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `type`
- `status`
- `consultationType`

### 11. Settings General Collection

**Collection Name**: `settings-general`

**Schema**:
```javascript
{
  websiteName: String,
  logo: String,
  phone: String,
  email: String,
  address: String,
  copyright: String,
  // Pharmacy-specific fields
  pharmacyLicense: String,
  operatingHours: String,
  emergencyContact: String,
  insuranceAccepted: Array,
  deliveryRadius: Number,
  minimumOrderAmount: Number,
  prescriptionPolicy: String,
  privacyPolicy: String,
  termsOfService: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 12. Forgot Password Collection

**Collection Name**: `forgot-password`

**Schema**:
```javascript
{
  email: String,
  otp: String,
  expireAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `email`
- `otp`

### 13. Inventory Alerts Collection

**Collection Name**: `inventory-alerts`

**Schema**:
```javascript
{
  product_id: String,
  alertType: String, // "low-stock", "expiry", "recall"
  threshold: Number,
  currentStock: Number,
  expiryDate: Date,
  message: String,
  status: String, // "active", "acknowledged", "resolved"
  acknowledgedBy: String,
  acknowledgedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `product_id`
- `alertType`
- `status`

## Relationships

### One-to-Many Relationships

1. **Product Category → Products**
   - One category can have multiple products
   - Foreign key: `product_category_id` in products collection

2. **Role → Accounts**
   - One role can be assigned to multiple accounts
   - Foreign key: `role_id` in accounts collection

3. **User → Carts**
   - One user can have multiple carts
   - Foreign key: `user_id` in carts collection

4. **User → Orders**
   - One user can have multiple orders
   - Foreign key: `user_id` in orders collection

5. **User → Prescriptions**
   - One user can have multiple prescriptions
   - Foreign key: `user_id` in prescriptions collection

6. **User → Chats**
   - One user can have multiple chat messages
   - Foreign key: `user_id` in chats collection

7. **Product → Inventory Alerts**
   - One product can have multiple inventory alerts
   - Foreign key: `product_id` in inventory-alerts collection

### Many-to-Many Relationships

1. **Users ↔ Room Chats**
   - Users can be in multiple chat rooms
   - Chat rooms can have multiple users
   - Junction table: `users` array in room-chats collection

2. **Users ↔ Users (Friends)**
   - Users can have multiple friends
   - Implemented through `friendList`, `acceptFriends`, and `requestFriends` arrays

3. **Products ↔ Prescriptions**
   - Products can be prescribed in multiple prescriptions
   - Prescriptions can contain multiple products
   - Junction table: `medications` array in prescriptions collection

## Data Flow

### Patient Registration Flow
1. Patient submits registration form
2. System creates user document in `users` collection
3. System generates `tokenUser` for session management
4. Patient can now access pharmacy services

### Prescription Management Flow
1. Patient uploads prescription → creates document in `prescriptions` collection
2. Pharmacist verifies prescription → updates status and verification details
3. Prescription items added to cart → creates/updates document in `carts` collection
4. Order created → creates document in `orders` collection
5. Medication dispensed → updates order status and dispensing details

### Inventory Management Flow
1. Low stock detected → creates alert in `inventory-alerts` collection
2. Pharmacist acknowledges alert → updates alert status
3. Stock replenished → updates product stock and resolves alert

### Consultation Flow
1. Patient initiates chat → creates room in `room-chats` collection
2. Pharmacist assigned → updates room assignment
3. Messages exchanged → creates documents in `chats` collection
4. Consultation resolved → updates room status

## Security Considerations

1. **HIPAA Compliance**: All patient data encrypted and access-controlled
2. **Password Hashing**: All passwords hashed using MD5
3. **Token-based Authentication**: Users and admins use token-based sessions
4. **Soft Deletes**: Most collections implement soft delete with `deleted` flag
5. **Role-based Access**: Admin features controlled by role permissions
6. **Input Validation**: All inputs validated through Mongoose schemas
7. **Audit Trails**: Complete activity logging for compliance
8. **Data Encryption**: Secure data transmission and storage

## Performance Optimizations

1. **Indexes**: Strategic indexes on frequently queried fields
2. **Pagination**: Large datasets paginated for better performance
3. **Selective Queries**: Only fetch required fields to reduce data transfer
4. **Caching**: Session data cached for faster access
5. **Database Sharding**: Horizontal scaling for large datasets
6. **Read Replicas**: Separate read operations for better performance

## Backup Strategy

1. **Regular Backups**: Automated MongoDB backups every 6 hours
2. **Point-in-time Recovery**: Transaction logs for data recovery
3. **Data Export**: Regular exports for disaster recovery
4. **Geographic Distribution**: Backups stored in multiple locations
5. **Encrypted Backups**: All backup data encrypted for security

## Migration Strategy

1. **Schema Versioning**: Track schema changes for migrations
2. **Backward Compatibility**: Maintain compatibility during updates
3. **Data Validation**: Validate data integrity after migrations
4. **Rollback Procedures**: Ability to rollback problematic migrations
5. **Testing Environment**: Test migrations in staging environment first

## Compliance Features

### HIPAA Compliance
- **Data Encryption**: All PHI encrypted at rest and in transit
- **Access Controls**: Role-based access to patient data
- **Audit Logging**: Complete audit trail for all data access
- **Data Retention**: Proper data retention and disposal policies
- **Breach Notification**: Automated breach detection and notification

### Pharmacy Regulations
- **Prescription Tracking**: Complete prescription lifecycle tracking
- **Drug Interaction Checking**: Automated drug interaction validation
- **Expiry Management**: Automated expiry date tracking and alerts
- **Controlled Substance Tracking**: Special handling for controlled substances
- **License Verification**: Pharmacist license verification system

---

*This database design supports the full functionality of the Pharmacy Product Management System while maintaining data integrity, security, and compliance with healthcare regulations.*
