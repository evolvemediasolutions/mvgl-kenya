import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedTypes = [
  'image/svg+xml',
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const cloudinaryName = env('CLOUDINARY_NAME') || env('CLOUDINARY_CLOUD_NAME');
  const cloudinaryKey = env('CLOUDINARY_KEY') || env('CLOUDINARY_API_KEY');
  const cloudinarySecret = env('CLOUDINARY_SECRET') || env('CLOUDINARY_API_SECRET');
  const hasCloudinary = Boolean(cloudinaryName && cloudinaryKey && cloudinarySecret);

  if (hasCloudinary) {
    console.log('[Strapi Media] Cloudinary provider ENABLED with cloud_name:', cloudinaryName);
  } else {
    console.warn('[Strapi Media] Cloudinary credentials missing or incomplete. Falling back to local storage.');
  }

  return {
    'users-permissions': {
      config: {
        jwtManagement: 'refresh',
        sessions: {
          httpOnly: true,
        },
      },
    },
    upload: {
      config: {
        ...(hasCloudinary
          ? {
              provider: 'cloudinary',
              providerOptions: {
                cloud_name: cloudinaryName,
                api_key: cloudinaryKey,
                api_secret: cloudinarySecret,
              },
              actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
              },
            }
          : {}),
        security: {
          allowedTypes: allowedMediaTypes,
          deniedTypes,
        },
      },
    },
  };
};

export default config;
