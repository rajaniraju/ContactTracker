
/****** Object:  Table [dbo].[PersonalInformation]    Script Date: 1/25/2021 5:17:14 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PersonalInformation](
	[FirstName] [nchar](20) NOT NULL,
	[LastName] [nchar](20) NOT NULL,
	[Address] [nvarchar](max) NOT NULL,
	[Address2] [nchar](20) NULL,
	[State] [nchar](10) NULL,
	[City] [nchar](10) NULL,
	[Zip] [nchar](10) NULL,
	[Phone] [nchar](10) NULL,
	[GUID][nvarchar](50) NOT NULL,
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


