# Import the Azure module
Import-Module Az

# Define parameters
$storageAccountName = "mystorageaccount"
$resourceGroupName = "myResourceGroup"
$location = "WestEurope"
$sku = "Standard_LRS"

# Login to Azure
Connect-AzAccount

# Create the resource group
New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create the storage account
New-AzStorageAccount -ResourceGroupName $resourceGroupName `
                     -Name $storageAccountName `
                     -Location $location `
                     -SkuName $sku `
                     -Kind StorageV2